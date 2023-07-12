import s from './InterestsPageView.module.scss';

export default function InterestsPageView ({ handleSendForm }: {
    handleSendForm: () => void
}) {
    return (
        <div className={s.interests}>
            <div className={s.block}>
                Интересы - это критерий для поиска людей или знакомых, с помощью которого Вы можете
                понять хотите - ли Вы общаться с этим человеком или у Вас мало чего общего.
                <div className={s.example}>
                    По умолчанию мы предлагаем Вам несколько стандартных интересов которые Вы можете 
                    настроить у себя в профиле (пример)
                    <button className={s.interestExample}>
                        Программирование
                    </button>
                </div>
            </div>
            <div className={s.formInterest}>
                <div className={s.wrapper}>
                    <h5>Заполните форму, если Вашего интереса нет в списке</h5>
                    <span className={s.text}>
                        Вы можете предложить нам добавить новый интерес в список выбора.
                        Тогда его смогут увидеть и выбирать другие пользователи, что поможет
                        Вам найти друзей.
                    </span>
                    <input type='text' placeholder='Название интереса' className={s.title} />
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