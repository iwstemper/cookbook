import React from 'react'
import ContentLoader from 'react-content-loader'

export default function ImageSkeleton(props) {
  return (
    <ContentLoader 
    speed={1}
    width={props.width}
    style={{aspectRatio: '1/1'}}
    viewBox="0 0 500 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="500" height="500" />
  </ContentLoader>
  )
}
