<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit, MichelCodecPacker } from "@taquito/taquito";
  import { char2Bytes, bytes2Char } from "@taquito/utils";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType } from "@airgap/beacon-sdk";

  let Tezos: TezosToolkit;
  let wallet: BeaconWallet;
  const walletOptions = {
    name: "Create NFTs",
    preferredNetwork: NetworkType.GHOSTNET,
  };
  let userAddress: string;
  let files, title, description;

  if (process.env.NODE_ENV === "dev") {
    title = "uranus";
    description = "this is Uranus";
  }

  const rpcUrl = "https://ghostnet.ecadinfra.com";
  const serverUrl =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "https://my-cool-backend-app.com";
  const contractAddress = "KT1HX3Zx6XTKTh7Pq1BGwLs1kyVZrMKDnh58";
  let nftStorage = undefined;
  let userNfts: { tokenId: number; ipfsHash: string }[] = [];
  let pinningMetadata = false;
  let mintingToken = false;
  let newNft:
    | undefined
    | { imageHash: string; metadataHash: string; opHash: string };

  const getUserNfts = async (address: string) => {
    // finds user's NFTs
    const contract = await Tezos.wallet.at(contractAddress);
    nftStorage = await contract.storage();
    const getTokenIds = await nftStorage.reverse_ledger.get(address);
    if (getTokenIds) {
      userNfts = await Promise.all([
        ...getTokenIds.map(async (id) => {
          const tokenId = id.toNumber();
          const metadata = await nftStorage.token_metadata.get(tokenId);
          const tokenInfoBytes = metadata.token_info.get("");
          const tokenInfo = bytes2Char(tokenInfoBytes);
          return {
            tokenId,
            ipfsHash:
              tokenInfo.slice(0, 7) === "ipfs://" ? tokenInfo.slice(7) : null,
          };
        }),
      ]);
    }
  };

  const connect = async () => {
    if (!wallet) {
      wallet = new BeaconWallet(walletOptions);
    }

    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl,
        },
      });
      userAddress = await wallet.getPKH();
      Tezos.setWalletProvider(wallet);
      await getUserNfts(userAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    wallet.client.destroy();
    wallet = undefined;
    userAddress = "";
  };

  const upload = async () => {
    try {
      pinningMetadata = true;
      const data = new FormData();
      data.append("image", files[0]);
      data.append("title", title);
      data.append("description", description);
      data.append("creator", userAddress);

      const response = await fetch(`${serverUrl}/mint`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      });
      if (response) {
        const data = await response.json();
        if (
          data.status === true &&
          data.msg.metadataHash &&
          data.msg.imageHash
        ) {
          pinningMetadata = false;
          mintingToken = true;
          // saves NFT on-chain
          const contract = await Tezos.wallet.at(contractAddress);
          const op = await contract.methods
            .mint(char2Bytes("ipfs://" + data.msg.metadataHash), userAddress)
            .send();
          console.log("Op hash:", op.opHash);
          await op.confirmation();

          newNft = {
            imageHash: data.msg.imageHash,
            metadataHash: data.msg.metadataHash,
            opHash: op.opHash,
          };

          console.log("Newly Minted NFT is : "+JSON.stringify(data));

          files = undefined;
          title = "";
          description = "";

          // refreshes storage
          await getUserNfts(userAddress);
        } else {
          throw "No IPFS hash";
        }
      } else {
        throw "No response";
      }
    } catch (error) {
      console.log(error);
    } finally {
      pinningMetadata = false;
      mintingToken = false;
    }
  };

  onMount(async () => {
    Tezos = new TezosToolkit(rpcUrl);
    Tezos.setPackerProvider(new MichelCodecPacker());
    wallet = new BeaconWallet(walletOptions);
    if (await wallet.client.getActiveAccount()) {
      userAddress = await wallet.getPKH();
      Tezos.setWalletProvider(wallet);
      await getUserNfts(userAddress);
    }
  });
</script>

<main>
  <div class="container">
    <h1>Mint NFTS</h1>
    {#if userAddress}
      <div>
        <div class="user-nfts">
          Your NFTs:
          {#if nftStorage}
            [ {#each userNfts.reverse() as nft, index}
              <a
                href={`https://cloudflare-ipfs.com/ipfs/${nft.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {nft.tokenId}
              </a>
              {#if index < userNfts.length - 1}
                <span>,&nbsp;</span>
              {/if}
            {/each} ]
          {/if}
        </div>
        <br />
        <button id="NFTBut" class="roman" on:click={disconnect}>Disconnect</button>
      </div>
      {#if newNft}
        <div>Your NFT has been successfully minted!</div>
        <div>
          <a
            href={`https://cloudflare-ipfs.com/ipfs/${newNft.imageHash}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Link to your picture
          </a>
        </div>
        <div>
          <a
            href={`https://cloudflare-ipfs.com/ipfs/${newNft.metadataHash}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Link to your metadata
          </a>
        </div>
        <div>
          <a
            href={`https://better-call.dev/ghostnet/opg/${newNft.opHash}/contents `}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Link to the operation details
          </a>
        </div>
        <div>
          <button id="NFTBut" class="roman" on:click={() => (newNft = undefined)}>
            Mint a new NFT
          </button>
        </div>
      {:else}
        <div>
          <div>Select your picture</div>
          <br />
          <input type="file" bind:files />
        </div>
        <div>
          <label for="image-title">
            <span>Email:</span>
            <input type="text" id="image-title" bind:value={title} />
          </label>
        </div>
        <div>
          <label for="image-description">
            <span>StudentId:</span>
            <textarea
              id="image-description"
              rows="1"
              bind:value={description}
            />
          </label>
        </div>
        <div>
          {#if pinningMetadata}
            <button id="NFTBut" class="roman"> Saving your image... </button>
          {:else if mintingToken}
            <button id="NFTBut" class="roman"> Minting your NFT... </button>
          {:else}
            <button id="NFTBut" class="roman" on:click={upload}> Mint NFT </button>
          {/if}
        </div>
      {/if}
    {:else}
      <!-- <div class="roman">Create an NFT with your pictures</div> -->
      <button  id="NFTBut" class="roman" on:click={connect}>Connect your wallet</button>
    {/if}
  </div>
</main>

<style lang="scss">
  $tezos-blue: #2e7df7;

  h1 {
    font-size: 3rem;
    font-family: "Roman-SD";
  }


  // This is for the NFT Button
  #NFTBut {
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: #090909;
    padding: 0.7em 1.7em;
    cursor: pointer;
    font-size: 18px;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    box-shadow:
      6px 6px 12px #c5c5c5,
      -6px -6px 12px #ffffff;
  }

  #NFTBut:active {
    color: #666;
    box-shadow:
      inset 4px 4px 12px #c5c5c5,
      inset -4px -4px 12px #ffffff;
  }

  #NFTBut:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  #NFTBut:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #2e7df7;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  #NFTBut:hover {
    color: #ffffff;
    border: 1px solid #2e7df7;
  }

  #NFTBut:hover:before {
    top: -35%;
    background-color: #2e7df7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  #NFTBut:hover:after {
    top: -45%;
    background-color: #2e7df7;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  // This is for the End of the NFT Button

  .roman {
    text-transform: uppercase;
    font-family: "Roman-SD";
    font-weight: bold;
  }

  .container {
    font-size: 1.3rem;
    & > div {
      padding: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    input,
    textarea {
      padding: 10px;
    }

    .user-nfts {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
