variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "repo_url" {
  description = "Public Git repo URL containing this project"
  type        = string
}

variable "key_name" {
  description = "Optional existing EC2 key pair name to enable SSH"
  type        = string
  default     = ""
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}
