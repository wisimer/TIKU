'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Mic } from 'lucide-react'
import { uploadCustomVoice } from '@/app/actions'

export default function CustomVoiceButton() {
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!audioFile) return

    const formData = new FormData()
    formData.append('audio', audioFile)

    await uploadCustomVoice(formData)
    setAudioFile(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Mic className="mr-2 h-4 w-4" />
          自定义声音
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>上传自定义声音</DialogTitle>
          <DialogDescription>
            上传你自己的声音样本，用于生成故事音频。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
            required
          />
          <Button type="submit" disabled={!audioFile}>
            上传
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

