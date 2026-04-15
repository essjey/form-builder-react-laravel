<?php

namespace App\Services;

use App\Models\FormTemplate;

class FormSubmissionRules
{
    public function build(FormTemplate $template): array
    {
        $rules = [];

        foreach ($template->schema['fields'] as $field) {
            if (empty($field['name'])) {
                continue;
            }

            $fieldRules = [];

            if (! empty($field['required'])) {
                $fieldRules[] = 'required';
            } else {
                $fieldRules[] = 'nullable';
            }

            if ($field['type'] === 'email') {
                $fieldRules[] = 'email';
            }

            if ($field['type'] === 'checkbox' && ! empty($field['required'])) {
                $fieldRules[] = 'accepted';
            } elseif ($field['type'] === 'checkbox') {
                $fieldRules[] = 'boolean';
            }

            /**
             * @todo Validation to add
             *
             * date support
             * multiselect support
             */
            if (in_array($field['type'], ['text', 'textarea'])) {
                $fieldRules[] = 'string';

                if (isset($field['min'])) {
                    $fieldRules[] = "min:{$field['min']}";
                }

                if (isset($field['max'])) {
                    $fieldRules[] = "max:{$field['max']}";
                }
            }

            $rules[$field['name']] = $fieldRules;
        }

        return $rules;
    }
}
