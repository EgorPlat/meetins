export interface ITariffOppotunity {
    title: string,
    description: string,
    oppotunitiesId: number 
}

export interface ITariff {
    tariffId: number,
    title: string,
    price: number,
    periodMonth: number,
    opportunities: ITariffOppotunity[]
}