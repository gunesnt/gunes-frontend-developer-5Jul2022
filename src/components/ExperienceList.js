import React, { useState } from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'

import experiencesData from 'experiencesData'
import Section from 'components/Section'
import ExperienceItem from 'components/ExperienceItem'
import EditExperienceModal from 'components/modals/EditExperienceModal'
import NoDataPlaceholder from 'components/NoDataPlaceholder'

const ExperienceList = () => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const handleAddModalOpen = () => setAddModalOpen(true)
  const handleAddModalClose = () => setAddModalOpen(false)

  return (
    <Section
      title="Work Experiences"
      action={
        <>
          <IconButton onClick={handleAddModalOpen}>
            <AddIcon />
          </IconButton>
          <EditExperienceModal
            open={addModalOpen}
            handleClose={handleAddModalClose}
          />
        </>
      }>
      {!experiencesData || !experiencesData.length ? (
        <NoDataPlaceholder
          IconComp={BusinessTwoToneIcon}
          message="Haven't added any experience yet."
        />
      ) : (
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
      )}
    </Section>
  )
}

export default ExperienceList
