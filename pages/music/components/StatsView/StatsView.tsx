import { useEffect } from 'react';
import s from './StatsView.module.scss';
import { getMyMusicStatistic, myStatistic } from '../../../../global/store/music_model';
import { useStore } from 'effector-react';
import { baseURL } from '../../../../global/store/store';

export default function StatsView() {

    const myStatistic$ = useStore(myStatistic);
    
    useEffect(() => {
        getMyMusicStatistic();
    }, []);

    return (
        <div className={s.statsView}>
            {
                myStatistic$.map(el => (
                    <div className={s.composition} key={el.title}>
                        <img className={s.image} src={baseURL + el.image} />
                        <div className={s.info}>
                            <div className={s.author}>{el.author}</div>
                            <div className={s.title}>
                                <span className={s.header}>Трек: </span>
                                {el.title}
                            </div>
                            <div className={s.playsNumber}>Количество прослушиваний: {el.playsNumber}</div>
                            <div className={s.listenersCount}>Количество слушателей: 1</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}