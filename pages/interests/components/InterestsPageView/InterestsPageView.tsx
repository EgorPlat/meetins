import { Ref } from "react";
import ButtonWithHint from "../../../../shared/ui/Hint/buttonWithHint";
import { IInterest } from "../../../../entities/interest";
import s from "./InterestsPageView.module.scss";
import CustomAccordion from "../../../../shared/ui/CustomAccordion/CustomAccordion";

export default function InterestsPageView ({ handleSendForm, currentInterests, titleRef }: {
    handleSendForm: () => void,
    currentInterests: IInterest[],
    titleRef: Ref<HTMLInputElement>
}) {
    return (
        <div className={s.interests}>
            <div className={s.block}>
                Интересы - это критерий для поиска людей, с помощью которого Вы можете
                понять есть ли у Вас что-то общее или нет . По умолчанию мы предлагаем Вам несколько стандартных интересов которые Вы можете 
                настроить у себя в профиле (пример)
                <div className={s.example}>
                    <button className={s.interestExample}>
                        Программирование
                    </button>
                </div>
            </div>
            <div className={s.formInterest}>
                <div className={s.interestsList}>
                    <div className={s.title}>
                        Текущий список интересов людей 
                        <ButtonWithHint 
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
                                <CustomAccordion
                                    key={el.interestId}
                                    text={el.title}
                                    subText={`
                                        Описание для выбранного Вами интереса
                                    `}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}