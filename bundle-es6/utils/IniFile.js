import solfege from "solfegejs";
import ini from "ini";

/**
 * An util class to manipulate INI file
 */
export default class IniFile
{
    /**
     * Constructor
     *
     * @param   {string}    filePath    The INI file path
     */
    constructor(filePath:string)
    {
        // Save the file path
        this.filePath = filePath;

        // The default values
        this.defaultValues = {};
    }

    /**
     * Set the optional default values
     *
     * @param   {object}    values  the default values
     */
    setDefaultValues(values)
    {
        this.defaultValues = values;
    }

    /**
     * Get the file content
     *
     * @public
     * @return  {string}    The content
     */
    *getContent()
    {
        let content = yield solfege.util.Node.fs.readFile(this.filePath);
        content = content.toString("utf8");

        return content;
    }

    /**
     * Set the new file content
     *
     * @public
     * @param   {string}    content     The new content
     */
    *setContent(content)
    {
        yield solfege.util.Node.fs.writeFile(this.filePath, content);
    }

    /**
     * Extract parameters from the file
     *
     * @public
     * @param   {RegExp}    regexp  The pattern of the parameter name
     * @return  {object}            The parameters
     */
    *getParameters(regexp?)
    {
        // Build the parameters based on the default values and the values from the INI file
        let content = yield this.getContent();
        let iniParameters = ini.parse(content);
        let parameters = Object.assign(this.defaultValues, iniParameters);

        // Filter the parameters if the regexp is provided
        if (regexp instanceof RegExp) {
            let filteredParameters = {};
            for (let key in parameters) {
                if (key.match(regexp)) {
                    filteredParameters[key] = parameters[key];
                }
            }
            return filteredParameters;
        }

        return parameters;
    }

    /**
     * Get a parameter value
     *
     * @param   {string}        name            The parameter name
     * @param   {string|number} defaultValue    The default value
     * @return  {string|number}                 The value
     */
    *getParameterValue(name:string, defaultValue)
    {
        // Extract the value from the main configuration
        let parameters = yield this.getParameters();
        if (parameters.hasOwnProperty(name)) {
            return parameters[name];
        }

        return defaultValue;
    }

    /**
     * Set a parameter value
     *
     * @param   {string}        name    The parameter name
     * @param   {string|number} value   The new value
     */
    *setParameterValue(name:string, value)
    {
        // Get the content
        let content = yield this.getContent();

        // The pattern to find the parameter line
        let regexp = new RegExp(`;?${name} *=.*`, "im");

        // Create the parameter if it doesn't exist
        if (content.search(regexp) === -1) {
            content += `\n;${name}=`;
        }

        // If the value is not a number, 
        // then wrap the value with double quotes
        if (isNaN(value)) {
            value = ini.safe(value);
            content = content.replace(
                regexp,
                `${name}="${value}"`
            );
        } else {
            content = content.replace(
                regexp,
                `${name}=${value}`
            );
        }

        // Update the content
        yield this.setContent(content);
    }
}
