import React from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'

import experiencesData from 'experiencesData'
import Section from 'components/Section'
import ExperienceItem from 'components/ExperienceItem'

const ExperienceList = () => {
  return (
    <Section title="Work Experiences">
      <List>
        {experiencesData.map((item, index) => (
          <React.Fragment key={item.id}>
            <ExperienceItem item={item} />
            {index < experiencesData.length - 1 && (
              <Divider variant="middle" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Section>
  )
}

export default ExperienceList
