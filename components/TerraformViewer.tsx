
import React from 'react';
import { FileCode, Download } from 'lucide-react';

const TERRAFORM_CODE = `
# main.tf for Loox Social Automator

# 1. Bucket for Storage
resource "google_storage_bucket" "review_images" {
  name     = "\${var.project_id}-reviews"
  location = "US"
  uniform_bucket_level_access = true
}

# 2. Pub/Sub for Orchestration
resource "google_pubsub_topic" "review_extracted" {
  name = "review-extracted-topic"
}

# 3. Cloud Function for Processing
resource "google_cloudfunctions_function" "processor" {
  name        = "process-loox-email"
  description = "Extracts data from Loox emails"
  runtime     = "nodejs18"
  
  event_trigger {
    event_type = "google.pubsub.topic.publish"
    resource   = google_pubsub_topic.review_extracted.id
  }

  environment_variables = {
    BUCKET_NAME = google_storage_bucket.review_images.name
  }
}

# 4. Cloud Scheduler (Gmail Poller)
resource "google_cloud_scheduler_job" "gmail_poller" {
  name     = "poll-loox-emails"
  schedule = "*/5 * * * *"
  
  pubsub_target {
    topic_name = google_pubsub_topic.review_extracted.id
    data       = base64encode("trigger")
  }
}
`;

const TerraformViewer: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <FileCode size={18} className="text-indigo-600" />
          <h3 className="font-bold text-slate-800">Terraform (main.tf)</h3>
        </div>
        <button className="p-2 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors">
          <Download size={18} />
        </button>
      </div>
      <div className="p-4 bg-slate-900 overflow-x-auto">
        <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
          {TERRAFORM_CODE.trim()}
        </pre>
      </div>
    </div>
  );
};

export default TerraformViewer;
