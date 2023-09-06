import { Entity } from "../../core"

interface StudentProps {
  name: string,
}

export class Student extends Entity<StudentProps> {
}