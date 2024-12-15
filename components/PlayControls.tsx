'use client'

import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react'

interface PlayControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  isRandom: boolean
  onToggleRandom: () => void
  repeatMode: 'off' | 'all' | 'one'
  onChangeRepeatMode: () => void
}

export default function PlayControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  isRandom,
  onToggleRandom,
  repeatMode,
  onChangeRepeatMode
}: PlayControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
      <div className="container mx-auto flex justify-center items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onPrevious}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button size="icon" onClick={onPlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={onNext}>
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button 
          variant={isRandom ? "default" : "outline"} 
          size="icon" 
          onClick={onToggleRandom}
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button 
          variant={repeatMode !== 'off' ? "default" : "outline"} 
          size="icon" 
          onClick={onChangeRepeatMode}
        >
          {repeatMode === 'one' ? (
            <Repeat1 className="h-4 w-4" />
          ) : (
            <Repeat className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

