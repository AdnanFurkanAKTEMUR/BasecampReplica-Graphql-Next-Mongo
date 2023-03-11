import TopicCard from "./TopicCard";

export default function TopicList(props: any) {
  console.log(props.topics);


  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
        {
          props.topics?.map((topic: any) => {
            return <TopicCard topic={topic} />
          })
        }
      </div>
    </>
  )
}