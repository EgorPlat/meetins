import { instance } from './store'
import { createEffect, createStore } from 'effector'

export type MainPageInfoT = {
	mainText: string
	description: string
}[]

export const getMainPageInfo = createEffect(async () => {
	const data = await instance.get('main-page/get-about')
	return data.data
})
export const $mainPageInfo = createStore<MainPageInfoT>([]).on(
	getMainPageInfo.doneData,
	(_, fetchedInfo) => fetchedInfo
)
