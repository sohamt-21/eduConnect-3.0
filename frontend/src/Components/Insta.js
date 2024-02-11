import { AmityUiKitProvider, AmityUiKitSocial } from "@amityco/ui-kit";
import SocialProfiles from "./SocialProfiles";


const apiKey = "b0e9bb5c6bd9a1631a318d1c5408168e865ad9b6ba316979";

function Insta() {

    const userId = "adityasuryawanshi5451@gmail.com";

    return (
    
    <>
      <SocialProfiles />
        <AmityUiKitProvider
            key={userId}
            apiKey={apiKey}
            userId={userId}
            displayName={userId}
        >
            <AmityUiKitSocial />
        </AmityUiKitProvider>

    </>

    );
}

export default Insta;