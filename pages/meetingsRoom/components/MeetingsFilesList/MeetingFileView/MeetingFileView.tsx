import { IGroupFile } from "../../../../../entities/groups"
import { baseURL } from "../../../../../global/store/store";
import CustomVideoPlayer from "../../../../../shared/ui/CustomVideoPlayer/CustomVideoPlayer";
import s from "./MeetingFileView.module.scss";

export default function MeetingsFilesList (props: {
    file: IGroupFile,
}) {
    const { file } = props;

    if (file) {
        return (
            <div className={s.file}>
                {
                    file.type.includes("image") &&
                    <img className={s.image} src={baseURL + file.src} />
                }
                {
                    file.type.includes("video") &&
                    <CustomVideoPlayer src={baseURL + file.src} />
                }
            </div>
        )
    } else {
        return null;
    }
}