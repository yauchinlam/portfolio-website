variable "resource_group_name" {
  description = "Name of the Azure resource group."
  type        = string
  default     = "rg-portfolio-website"
}

variable "location" {
  description = "Azure region for the resource group and Static Web App (must support Static Web Apps)."
  type        = string
  default     = "eastus2"
}

variable "static_web_app_name" {
  description = "Globally unique name for the Azure Static Web App."
  type        = string
}

variable "sku_tier" {
  description = "SKU tier: Free or Standard."
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.sku_tier)
    error_message = "sku_tier must be Free or Standard."
  }
}

variable "sku_size" {
  description = "SKU size: Free or Standard (must match tier)."
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.sku_size)
    error_message = "sku_size must be Free or Standard."
  }
}

variable "tags" {
  description = "Tags applied to Azure resources."
  type        = map(string)
  default = {
    project = "portfolio-website"
    managed = "terraform"
  }
}

variable "app_location" {
  description = "Application root folder in the repo (for Azure build config / documentation)."
  type        = string
  default     = "/"
}

variable "output_location" {
  description = "Built static assets folder relative to app_location (Vite outputs to dist)."
  type        = string
  default     = "dist"
}
