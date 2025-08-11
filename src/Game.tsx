import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CricketField() {
  const groundRef = useRef<THREE.Mesh>(null!)
  return (
    <mesh ref={groundRef} rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[20, 64]} />
      <meshStandardMaterial color="#228B22" />
    </mesh>
  )
}

function CricketBall({ position, onOutOfBounds }: { position: [number, number, number], onOutOfBounds: () => void }) {
  const ballRef = useRef<THREE.Mesh>(null!)
  const velocity = useRef<[number, number, number]>([0, 0, 0])

  useFrame(() => {
    if (!ballRef.current) return

    // Simple gravity
    velocity.current[1] -= 0.01
    ballRef.current.position.x += velocity.current[0]
    ballRef.current.position.y += velocity.current[1]
    ballRef.current.position.z += velocity.current[2]

    // Bounce
    if (ballRef.current.position.y < 0.2) {
      velocity.current[1] *= -0.5
      ballRef.current.position.y = 0.2
    }

    // Out of bounds
    if (
      Math.abs(ballRef.current.position.x) > 25 ||
      Math.abs(ballRef.current.position.z) > 25
    ) {
      onOutOfBounds()
    }
  })

  const hitBall = (power: number, angle: number) => {
    velocity.current = [
      Math.sin(angle) * power * 0.1,
      power * 0.15,
      Math.cos(angle) * power * 0.1
    ]
  }

  return (
    <mesh ref={ballRef} position={position} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default function Game({ controlMode }: { controlMode: 'timing' | 'swipe' }) {
  const [score, setScore] = useState(0)
  const [balls, setBalls] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [ballKey, setBallKey] = useState(0)

  const ballOutHandler = () => {
    if (balls + 1 >= 24) {
      setGameOver(true)
    } else {
      setBalls(balls + 1)
      setBallKey(ballKey + 1)
    }
  }

  return (
    <div style={{ height: 500, background: '#87ceeb', borderRadius: 8, overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 10, 25], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} castShadow />
        <CricketField />
        <CricketBall key={ballKey} position={[0, 0.2, 0]} onOutOfBounds={ballOutHandler} />
      </Canvas>
      <div style={{ padding: 8, background: '#111', color: '#fff' }}>
        <b>Score:</b> {score} &nbsp;|&nbsp; <b>Balls:</b> {balls}/24
        {gameOver && <div>Game Over!</div>}
      </div>
    </div>
  )
}
