import React from 'react'
import ContentLoader from 'react-content-loader'

const BulletListSkeleton = ({height, width, textWidth}) => (
  <ContentLoader
    width={width || '100%'}
    height={height}
    viewBox="0 0 100% 100%"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
  >
    <circle cx="10%" cy="20" r="15"/>
    <rect x="25%" y="20%" rx="6" ry="6" width={textWidth || "50%"} height="50%" />
  </ContentLoader>
)

export default BulletListSkeleton