import { NextRequest, NextResponse } from 'next/server'
import { saveChecklistItem } from '@lib/dynamodb'

export async function POST(req: NextRequest) {
  const { userId, itemId, item } = await req.json()
  await saveChecklistItem(userId, itemId, item)
  return NextResponse.json({ success: true })
}
