const CodeBlock = ({ yaml }) => (
  <pre className="bg-gray-900 text-gray-400 p-4 rounded text-sm overflow-x-auto mb-4 mt-8">
    {yaml}
  </pre>
)

const kubernetesYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    App: smarter
    app.kubernetes.io/managed-by: Helm
  name: smarter
  namespace: smarter-platform-prod
spec:
   ... stuff about the configuration of this software deployment goes here
status:
   ... stuff about the current state of this deployment goes here`

export const KubernetesManifest = () => <CodeBlock yaml={kubernetesYaml} />

const smarterYaml = `apiVersion: smarter.sh/v1
kind: SqlPlugin
metadata:
  name: stackademy_sql
  pluginClass: sql
spec:
  selector:
    directive: always
  prompt:
    provider: openai
    systemRole: >
      You are a helpful student advisor at the fictional Stackademy University that only offers computer science
      degrees programs. Whenever possible you should defer to the tool calls provided for additional information
      about the courses offered by Stackademy University. Questions unrelated to the courses or Stackademy University
      should be answered with "I am sorry, but I can only provide information about the courses offered by Stackademy University."
    model: gpt-4o-mini
    temperature: 0.5
    maxTokens: 2048
  connection: smarter_test_db
  sqlData:
    sqlQuery: SELECT c.course_code, c.course_name, c.description, c.cost, prerequisite.course_code AS prerequisite_course_code, prerequisite.course_name AS prerequisite_course_name
      FROM courses c
      LEFT JOIN courses prerequisite ON c.prerequisite_id = prerequisite.course_id
      WHERE ((c.description LIKE CONCAT('%', {description}, '%')) OR ({description} IS NULL))
        AND (c.cost <= {max_cost} OR {max_cost} IS NULL)
      ORDER BY c.prerequisite_id;

   ... more stuff about this plugin`

export const SmarterManifest = () => <CodeBlock yaml={smarterYaml} />
