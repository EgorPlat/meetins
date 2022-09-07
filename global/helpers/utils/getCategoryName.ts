const categorysName = [
    {en: 'theater', ru: 'Театр'},
    {en: 'cinema', ru: 'Кино'},
    {en: 'concert', ru: 'Концерты'},
    {en: 'exhibition', ru: 'Выставки'},
    {en: 'tour', ru: 'Экскурсии'},
    {en: 'quest', ru: 'Квесты'},
]
export const getCategoryName = (categoryName: string) => {
    return categorysName.filter(category => category.en === categoryName)[0]?.ru;
}