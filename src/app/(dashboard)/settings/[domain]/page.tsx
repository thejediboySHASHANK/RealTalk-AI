import {onGetCurrentDomainInfo} from "@/actions/settings";

type Props = {
    params: {
        domain: string;
    };
};
const DomainSettingsPage = async ({params}: Props) => {
    const domain = await onGetCurrentDomainInfo(params.domain);
    return (
        <div>DomainSettingsPage</div>
    );
};
export default DomainSettingsPage;
