import { ChevronDown } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarRail,
} from '@/components/ui/sidebar'
import { getAcademicDetails, getAcademicList } from '@/modules/academics'
import { getProjectDetails, getProjectList } from '@/modules/projects'

import { SubLinkItem } from './client'

export const AppSidebar = () => {
  return (
    <Sidebar variant="floating" side="left" collapsible="offcanvas">
      <SidebarMenu>
        <AcademicNavigationSub />
        <ProjectsNavigationSub />
      </SidebarMenu>
      <SidebarRail />
    </Sidebar>
  )
}

const AcademicNavigationSub = async () => {
  const academics = await getAcademicList()
  const academicDetails = await getAcademicDetails()

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {academicDetails?.title}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenuSub>
            {academics?.map(academic => (
              <SubLinkItem key={academic.id} href={`#${academic.id}`}>
                {academic.title}
              </SubLinkItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

const ProjectsNavigationSub = async () => {
  const projects = await getProjectList()
  const projectsDetails = await getProjectDetails()

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {projectsDetails?.title} ({projects?.length})
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenuSub>
            {projects?.map(project => (
              <SubLinkItem key={project.id} href={`/projects/${project.id}`}>
                {project.title}
              </SubLinkItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
