import { FeedWrapper } from "@/components/FeedWrapper"
import { StickyWrapper } from "@/components/StickyWrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/UserProgress"

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={{title: "Spanish", imageSrc: "/es.svg"}} hearts={5} points={100} hasActiveSubscription={false}></UserProgress>
      </StickyWrapper>

      <FeedWrapper>
          <Header title="Spanish"></Header>
      </FeedWrapper>
    </div>
  )
}

export default LearnPage
