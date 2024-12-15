'use server'

import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'

export interface Story {
  id: string
  title: string
  url: string
  type: 'audio' | 'video'
}

const stories: Story[] = [
  { id: '1', title: '两只笨狗熊', url: '/stories/audio/little-red-riding-hood.mp3', type: 'audio' },
  { id: '2', title: '不洗脸的小花猫', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '3', title: '小猫咪穿鞋子', url: '/stories/audio/little-red-riding-hood.mp3', type: 'audio' },
  { id: '4', title: '光头狮子', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '5', title: '新婚之夜', url: '/stories/audio/little-red-riding-hood.mp3', type: 'audio' },
  { id: '6', title: '小红帽和大灰狼', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '7', title: '玫瑰花精', url: '/stories/audio/little-red-riding-hood.mp3', type: 'audio' },
  { id: '8', title: '长不大的牧羊人', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '9', title: '狐狸和兔子', url: '/stories/audio/little-red-riding-hood.mp3', type: 'audio' },
  { id: '10', title: '六只天鹅', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '11', title: '小熊跳舞', url: '/stories/audio/little-red-riding-hood.mp3', type: 'audio' },
  { id: '12', title: '小猫和小老鼠', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '13', title: '小马过河', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },
  { id: '14', title: '三只小猪', url: '/stories/audio/three-little-pigs.mp3', type: 'audio' },

  { id: '3', title: '灰姑娘', url: '/stories/video/cinderella.mp4', type: 'video' },
  { id: '4', title: '白雪公主', url: '/stories/video/snow-white.mp4', type: 'video' },
]

export async function getStories(): Promise<Story[]> {
  return stories
}

export async function uploadCustomVoice(formData: FormData) {
  const audio = formData.get('audio') as File
  const fileName = `custom-voice-${Date.now()}.${audio.name.split('.').pop()}`
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

  await fs.writeFile(filePath, Buffer.from(await audio.arrayBuffer()))

  // 这里你可以添加处理自定义声音的逻辑，比如将其应用到文本到语音的转换中

  revalidatePath('/')
}

