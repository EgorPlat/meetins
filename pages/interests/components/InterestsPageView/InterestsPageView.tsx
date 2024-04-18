import { Ref } from 'react';
import ButtonWithHint from '../../../../components-ui/Hint/buttonWithHint';
import { IInterest } from '../../../../global/interfaces/interest';
import s from './InterestsPageView.module.scss';

export default function InterestsPageView ({ handleSendForm, currentInterests, titleRef }: {
    handleSendForm: () => void,
    currentInterests: IInterest[],
    titleRef: Ref<HTMLInputElement>
}) {
    return (
        <div className={s.interests}>
            <div className={s.block}>
                Интересы - это критерий для поиска людей, с помощью которого Вы можете
                понять есть ли у Вас что-то общее или нет .
                <div className={s.example}>
                    По умолчанию мы предлагаем Вам несколько стандартных интересов которые Вы можете 
                    настроить у себя в профиле (пример)
                    <button className={s.interestExample}>
                        Программирование
                    </button>
                </div>
            </div>
            <div className={s.formInterest}>
            <div className={s.interestsList}>
                    <ButtonWithHint 
                            title='?'
                            hintTitle={
                                `Здесь указаны все интересы, которые могут быть использованы на сайте.`
                            }
                            fontSize={13}
                        />
                    <div className={s.title}>
                        Текущий список интересов людей:
                    </div>
                    {
                        currentInterests?.map((el, index) => (
                            <div key={el.interestId}>
                                {
                                    index < currentInterests.length - 1 ? el.title + ',': el.title
                                }
                            </div>
                        ))
                    }
                </div>
                <div className={s.wrapper}>
                    <h5>Заполните форму, если Вашего интереса нет в списке</h5>
                    <span className={s.text}>
                        Вы можете предложить нам добавить новый интерес в список выбора.
                        Тогда его смогут увидеть и выбирать другие пользователи, что поможет
                        Вам найти друзей.
                    </span>
                    <input 
                        type='text' 
                        placeholder='Название интереса' 
                        className={s.title}
                        ref={titleRef}
                    />
                    <textarea 
                        placeholder='В чем заключается ваш интерес?' 
                        className={s.description}
                    ></textarea>
                    <button 
                        className={s.submit}
                        onClick={handleSendForm}
                    >Отправить</button>
                </div>
            </div>
        </div>
    )
}