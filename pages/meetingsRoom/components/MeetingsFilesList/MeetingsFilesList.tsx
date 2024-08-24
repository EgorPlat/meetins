import { IGroupFile } from "../../../../global/interfaces/groups";
import { baseURL } from "../../../../global/store/store";
import MeetingFileView from "./MeetingFileView/MeetingFileView";
import s from "./MeetingsFilesList.module.scss";

export default function MeetingsFilesList(props: {
    files: IGroupFile[],
}) {
    if (props.files) {
        return (
            <div className={s.meetingsFilesList}>
                {
                    props.files?.map(el => (
                        <a href={baseURL + el.src} target='__blank' key={el.src}>
                            <MeetingFileView
                                file={el}
                            />
                        </a>
                        
                    ))
                }
            </div>
        )
    } else {
        return null;
    }
}