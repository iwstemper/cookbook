import React from 'react'
import ContentLoader from 'react-content-loader'

const RowSkeleton = ({height}) => (
  <ContentLoader
    width={'100%'}
    height={height}
    viewBox="0 0 100% 100%"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
  >
    <rect x="5%" y="12" rx="6" ry="6" width="90%" height="100%" />
  </ContentLoader>
)

export default RowSkeleton