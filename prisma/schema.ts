model Task {
  id        Int      @id @default(autoincrement())
  title     String   @unique
  status    Status   @default(Draft)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // Represents a task in the TaskFlow domain, with a unique title and various statuses.
}

model Status {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  // Represents the status of a task, such as Draft, InProgress, or Completed.
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // Represents a user in the TaskFlow domain, with a unique email address.
}