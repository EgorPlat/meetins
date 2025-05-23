
import { baseURL } from "@/global/store/store";
import { MeetingFile } from "@/entities/meetings";
import CustomVideoPlayer from "@/shared/ui/CustomVideoPlayer/CustomVideoPlayer";
import s from "./MeetingFileView.module.scss";

export default function MeetingsFilesList (props: {
    file: MeetingFile,
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