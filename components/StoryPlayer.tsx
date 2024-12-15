'use client'

import { useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from 'lucide-react'

interface Story {
  id: string
  title: string
  url: string
  type: 'audio' | 'video'
}

interface StoryPlayerProps {
  story: Story
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onEnded: () => void
}

export default function StoryPlayer({ story, isPlaying, onPlay, onPause, onEnded }: StoryPlayerProps) {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null)

  useEffect(() => {
    if (isPlaying) {
      mediaRef.current?.play()
    } else {
      mediaRef.current?.pause()
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (isPlaying) {
      onPause()
    } else {
      onPlay()
    }
  }

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
        {story.type === 'audio' ? (
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={story.url}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
          />
        ) : (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={story.url}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            className="w-full"
          />
        )}
        {/* <Button
          className="absolute bottom-4 right-4"
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? "暂停" : "播放"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button> */}
      </CardContent>
    </Card>
  )
}

