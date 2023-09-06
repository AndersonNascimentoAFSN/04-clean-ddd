import { Entity } from "../../core"

interface StudentProps {
  name: string,
}

export class Student extends Entity<StudentProps> {
  constructor(props: StudentProps, id?: string) {
    super(props, id)
  }
}