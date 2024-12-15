import StoryList from '@/components/StoryList'
import CustomVoiceButton from '@/components/CustomVoiceButton'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">用自己的声音讲故事</h1>
        <CustomVoiceButton />
      </div>
      <StoryList />
    </div>
  )
}

