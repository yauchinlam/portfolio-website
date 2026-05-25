output "resource_group_name" {
  description = "Resource group name."
  value       = azurerm_resource_group.portfolio.name
}

output "static_web_app_name" {
  description = "Static Web App resource name."
  value       = azurerm_static_web_app.portfolio.name
}

output "static_web_app_id" {
  description = "Static Web App Azure resource ID."
  value       = azurerm_static_web_app.portfolio.id
}

output "default_host_name" {
  description = "Default *.azurestaticapps.net hostname."
  value       = azurerm_static_web_app.portfolio.default_host_name
}

output "static_web_app_url" {
  description = "HTTPS URL for the deployed site."
  value       = "https://${azurerm_static_web_app.portfolio.default_host_name}"
}

output "api_key" {
  description = "Deployment token for SWA CLI / GitHub Actions (azurerm_static_web_app deployment)."
  value       = azurerm_static_web_app.portfolio.api_key
  sensitive   = true
}

# Use these values in GitHub Actions or swa deploy (see terraform/README.md)
output "vite_build_config" {
  description = "Recommended Azure Static Web Apps build settings for this Vite React app."
  value = {
    app_location    = var.app_location
    output_location = var.output_location
    build_command   = "npm run build"
  }
}
