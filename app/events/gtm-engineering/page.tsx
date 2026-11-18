import { WorkshopDetail, workshopMetadata } from "../workshop-detail";
import { workshops } from "../workshops";
const workshop = workshops[0];
export const metadata = workshopMetadata(workshop);
export default function Page() { return <WorkshopDetail workshop={workshop} />; }
