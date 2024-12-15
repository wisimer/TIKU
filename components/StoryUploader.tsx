'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { uploadStory } from '@/app/actions'

export default function StoryUploader() {
  const [title, setTitle] = useState('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [storyText, setStoryText] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !audioFile || !storyText) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('audio', audioFile)
    formData.append('text', storyText)

    // await uploadStory(formData)
    setTitle('')
    setAudioFile(null)
    setStoryText('')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="故事标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
        required
      />
      <Textarea
        placeholder="故事文本"
        value={storyText}
        onChange={(e) => setStoryText(e.target.value)}
        required
      />
      <Button type="submit">上传故事</Button>
    </form>
  )
}

