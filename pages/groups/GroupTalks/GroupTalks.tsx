import GroupTalksView from './GroupTalksView/GroupTalksView';

export default function GroupTalks(props: {
    handleOpenTalkMessages: () => void
}) {
    return (
        <GroupTalksView
            handleOpenTalkMessages={props.handleOpenTalkMessages}
        />
    )
}