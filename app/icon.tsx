import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#C4703F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#EDE8E0',
            fontFamily: 'Georgia, serif',
            marginTop: -2,
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  )
}
