import { useState, useEffect } from 'react'
import { getStories } from '../actions'

interface Story {
  id: string
  title: string
  url: string
  type: 'audio' | 'video'
}

export function useStories() {
  const [audioStories, setAudioStories] = useState<Story[]>([])
  const [videoStories, setVideoStories] = useState<Story[]>([])

  useEffect(() => {
    const fetchStories = async () => {
      const stories = await getStories()
      setAudioStories(stories.filter(story => story.type === 'audio'))
      setVideoStories(stories.filter(story => story.type === 'video'))
    }
    fetchStories()
  }, [])

  return { audioStories, videoStories }
}

