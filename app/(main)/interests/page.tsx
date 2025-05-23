import { baseURL } from "@/global/store/store";
import { IInterest } from "@/entities/interest";
import InterestsPageView from "@/components/interests/InterestsPageView/InterestsPageView";


async function fetchedInterestsData() {
    const response = await fetch(baseURL + "interests/get-interests");
    const currentInterests = await response.json();

    return currentInterests;
}

export default async function Interests() {

    const currentInterests: IInterest[] = await fetchedInterestsData();
    
    return (
        <InterestsPageView currentInterests={currentInterests} />
    )
}