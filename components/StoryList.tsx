'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useStories } from '@/app/hooks/useStories'
import { Story } from '@/app/actions'

export default function StoryList() {
  const { audioStories, videoStories } = useStories()
  const [currentTab, setCurrentTab] = useState<'audio' | 'video'>('audio')
  const [selectedStories, setSelectedStories] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloadReady, setIsDownloadReady] = useState(false)

  const stories = currentTab === 'audio' ? audioStories : videoStories

  const toggleStorySelection = (id: string) => {
    setSelectedStories(prev => 
      prev.includes(id) ? prev.filter(storyId => storyId !== id) : [...prev, id]
    )
  }

  const handleGenerate = () => {
    if (selectedStories.length === 0) return
    setIsGenerating(true)
    setIsDownloadReady(false)
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      setIsDownloadReady(true)
    }, 30000)
  }

  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading selected stories:', selectedStories)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="audio" onValueChange={(value) => setCurrentTab(value as 'audio' | 'video')}>
        <TabsList className="mb-4">
          <TabsTrigger value="audio">音频故事</TabsTrigger>
          <TabsTrigger value="video">视频故事</TabsTrigger>
        </TabsList>
        <TabsContent value="audio">
          <StoryListContent stories={audioStories} selectedStories={selectedStories} toggleSelection={toggleStorySelection} />
        </TabsContent>
        <TabsContent value="video">
          <StoryListContent stories={videoStories} selectedStories={selectedStories} toggleSelection={toggleStorySelection} />
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex justify-end space-x-4">
        <Button onClick={handleGenerate} disabled={selectedStories.length === 0 || isGenerating}>
          {isGenerating ? '生成中...' : '生成'}
        </Button>
        {isDownloadReady && (
          <Button onClick={handleDownload}>
            下载
          </Button>
        )}
      </div>
    </div>
  )
}

interface StoryListContentProps {
  stories: Story[]
  selectedStories: string[]
  toggleSelection: (id: string) => void
}

function StoryListContent({ stories, selectedStories, toggleSelection }: StoryListContentProps) {
  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <div key={story.id} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Checkbox
            id={`story-${story.id}`}
            checked={selectedStories.includes(story.id)}
            onCheckedChange={() => toggleSelection(story.id)}
          />
          <label htmlFor={`story-${story.id}`} className="flex-grow cursor-pointer">
            <h3 className="text-lg font-semibold">{story.title}</h3>
          </label>
        </div>
      ))}
    </div>
  )
}

