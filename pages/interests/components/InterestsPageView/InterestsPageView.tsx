import CustomButtonWithHint from "../../../../shared/ui/CustomButtonWithHint/CustomButtonWithHint";
import { IInterest } from "../../../../entities/interest";
import s from "./InterestsPageView.module.scss";
import CustomAccordion from "../../../../shared/ui/CustomAccordion/CustomAccordion";
import { useTranslation } from "react-i18next";

export default function InterestsPageView ({ currentInterests }: {
    currentInterests: IInterest[],
}) {

    const { t } = useTranslation();

    if (currentInterests) {
        return (
            <div className={s.interests}>
                <div className={s.block}>
                    <span>
                        { t("Интересы - это критерий для поиска людей, с помощью которого Вы можете понять есть ли у Вас что-то общее или нет . По умолчанию мы предлагаем Вам несколько стандартных интересов которые Вы можете настроить у себя в профиле (пример)")}.
                    </span>
                    <button className={s.interestExample}>
                        Программирование
                    </button>
                </div>
                <div className={s.formInterest}>
                    <div className={s.interestsList}>
                        <div className={s.title}>
                            {t("Текущий список интересов людей")}
                            <CustomButtonWithHint 
                                title='?'
                                hintTitle={
                                    "Здесь указаны все интересы, которые могут быть использованы на сайте."
                                }
                                fontSize={13}
                            />
                        </div>
                        <div className={s.list}>
                            {
                                currentInterests?.map((el) => (
                                    <div className={s.listElem} key={el.interestId}>
                                        <CustomAccordion
                                            key={el.interestId}
                                            text={el.title}
                                            subText={`
                                            Описание для выбранного Вами интереса
                                        `}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}