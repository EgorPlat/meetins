import s from './GroupsListView.module.scss';
import Image from 'next/image';

export const GroupsListView = () => {
    return (
        <div className={s.groupsListView}>
            <div className={s.groupsFilters}>
                <div className={s.title}>
                    Сообщества подобраны исходя из настроек Вашего профиля и интересов.
                </div>
                <span className={s.option}>Создать сообщество</span>
                <span className={s.option}>Мои Сообщества</span>
            </div>
            <div className={s.groupsContent}>
                <div className={s.list}>
                    {
                        [1, 2, 3].map(el => (
                            <div className={s.group} key={el}>
                                <div className={s.image}>
                                    <img 
                                        src="https://eusp.org/sites/default/files/news/preview/2019/l_6643290037_7ac713ccf1_b.jpg"
                                        width="80px"
                                        height="80px"
                                    />
                                </div>
                                <div className={s.info}>
                                    <div className={s.name}>Учимся рисовать</div>
                                    <div className={s.type}>Рисование, искусство, живопись</div>
                                    <div className={s.followers}>Участников: <span style={{color: 'gray'}}>15.0k</span></div>
                                </div>
                                <div className={s.actions}>
                                    <button>Присоединиться</button>
                                    <button>Перейти</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}