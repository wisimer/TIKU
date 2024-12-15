'use client'

import { Button } from "@/components/ui/button"

export default function Generating() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
      <div className="container mx-auto flex justify-center items-center space-x-4">
        <Button>
          生成故事
        </Button>
      </div>
    </div>
  )
}

