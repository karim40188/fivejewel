import React from 'react'

function Bubbles() {
  return (
    <div>
         <div className="bubbles">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className={`bubble animation-delay-${index}`}
            style={{
              animationDelay: `${index * 2}s`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Bubbles