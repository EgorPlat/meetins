import { useRouter } from "next/router"
import { useTranslation } from "react-i18next";
import PageContainer from "../../components/pageContainer/pageContainer";
import EventsList from "./EventsList/EventsList";
import s from "./nameCategory.module.scss";
import { useState } from "react";
import CustomModal from "../../global/helpers/CustomModal/CustomModal";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    const [isNotificationModalShow, setIsNotificationModalShow] = useState<boolean>(true);
    const { t } = useTranslation();

    return(
        <PageContainer>
            <div className={s.content}>
                <div className={`${s.list} ${s.block}`}>
                    {
                        nameCategory && typeof nameCategory === "string"
                        ? <EventsList category={nameCategory}/> : null
                    }
                </div>
                <CustomModal
                    isDisplay={isNotificationModalShow}
                    changeModal={setIsNotificationModalShow}
                    actionConfirmed={() => setIsNotificationModalShow(false)}
                    title="Уведомление"
                    typeOfActions="default"
                >
                    Внимание, данный раздел (События) может работать медленно. 
                    Это временно, вскоре мы постараемся решить данную проблему.
                </CustomModal>
            </div>
        </PageContainer>
    )
}