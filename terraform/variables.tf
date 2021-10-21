variable "name" {
  type        = string
  description = "The name of the Amplify App to be created."
}

variable "repo_url" {
  type        = string
  description = "The url of the repo that the Amplify App will be created around."
}

variable "access_token" {
  type        = string
  description = "Access token for git."
}