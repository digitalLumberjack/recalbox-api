var expect = require('chai').expect;
var should = require('chai').should();
var request = require('supertest');
var pm2 = require('pm2');
var xml2js = require('xml2js');
var fs = require('fs');
var baseUrl = "http://127.0.0.1:1339";

/**
 * Test the REST API
 */
describe('REST API', function()
{
    // Increase the timeout to 10s
    this.timeout(10000);

    /**
     * It runs before all tests
     */
    before(function(done)
    {
        // Start the server
        pm2.connect(function() {
            pm2.start({
                name               : "recalbox-api-test",
                exec_interpreter   : "node",
                exec_mode          : "cluster",
                instances          : 1,
                max_memory_restart : "100M",
                node_args          : ["--harmony", "--harmony_proxies"],
                cwd                : "test/rest",
                script             : "console.js",
                args               : ["server:start"]
            }, function(error, apps) {
                pm2.disconnect();
                setTimeout(done, 5000);
            });
        });
    });

    /**
     * It runs before each test
     */
    beforeEach(function(done)
    {
        // Reset the configuration file
        var source = __dirname + "/share/system/recalbox.conf.template";
        var destination = __dirname + "/share/system/recalbox.conf";
        fs.readFile(source, "utf8", function (error, data) {
            fs.writeFile(destination, data, done);
        });
    });

    /**
     * It runs after all tests
     */
    after(function(done)
    {
        // Stop the server
        pm2.connect(function() {
            pm2.stop("recalbox-api-test", function(error, proc) {
                pm2.disconnect();

                // Reset the configuration file
                var source = __dirname + "/share/system/recalbox.conf.template";
                var destination = __dirname + "/share/system/recalbox.conf";
                fs.readFile(source, "utf8", function (error, data) {
                    fs.writeFile(destination, data, done);
                });
            });
        });
    });

    /**
     * Test the API GET /
     */
    describe("GET /", function()
    {
        it("should return the API homepage", function(done)
        {
            request(baseUrl)
                .get("/")
                .set("Accept", "text/plain")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("Recalbox API");
                    done();
                });
        });
    });

    /**
     * Test the API GET /hostname
     */
    describe("GET /hostname", function()
    {
        it("should return the hostname from the configuration", function(done)
        {
            request(baseUrl)
                .get("/hostname")
                .set("Accept", "text/plain")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("RECALBOX");
                    done();
                });
        });

        it("should return the hostname in JSON format", function(done)
        {
            request(baseUrl)
                .get("/hostname")
                .set("Accept", "application/json")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    var response = JSON.parse(response.text);
                    expect(response).to.deep.equal({hostname:"RECALBOX"});
                    done();
                });
        });

        it("should return the hostname in XML format", function(done)
        {
            request(baseUrl)
                .get("/hostname")
                .set("Accept", "application/xml")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    xml2js.parseString(response.text, function(error, result) {
                        expect(result.response).to.deep.equal({hostname:["RECALBOX"]});
                        done();
                    });
                });
        });
    });

    /**
     * Test the API PUT /hostname
     */
    describe("PUT /hostname", function()
    {
        it("should update the hostname", function(done)
        {
            request(baseUrl)
                .put("/hostname")
                .set("Accept", "text/plain")
                .set("Content-Type", "text/plain")
                .send("HELLO")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("HELLO");
                    done();
                });
        });
    });

    /**
     * Test the API GET /keyboardlayout
     */
    describe("GET /keyboardlayout", function()
    {
        it("should return the keyboard layout from the configuration", function(done)
        {
            request(baseUrl)
                .get("/keyboardlayout")
                .set("Accept", "text/plain")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("fr");
                    done();
                });
        });

        it("should return the keyboard layout in JSON format", function(done)
        {
            request(baseUrl)
                .get("/keyboardlayout")
                .set("Accept", "application/json")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    var response = JSON.parse(response.text);
                    expect(response).to.deep.equal({keyboardlayout:"fr"});
                    done();
                });
        });

        it("should return the keyboard layout in XML format", function(done)
        {
            request(baseUrl)
                .get("/keyboardlayout")
                .set("Accept", "application/xml")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    xml2js.parseString(response.text, function(error, result) {
                        expect(result.response).to.deep.equal({keyboardlayout:["fr"]});
                        done();
                    });
                });
        });
    });

    /**
     * Test the API PUT /keyboardlayout
     */
    describe("PUT /keyboardlayout", function()
    {
        it("should update the keyboard layout", function(done)
        {
            request(baseUrl)
                .put("/keyboardlayout")
                .set("Accept", "text/plain")
                .set("Content-Type", "text/plain")
                .send("es")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("es");
                    done();
                });
        });
    });

    /**
     * Test the API GET /wifi
     */
    describe("GET /wifi", function()
    {
        it("should return the wifi settings from the configuration", function(done)
        {
            request(baseUrl)
                .get("/wifi")
                .set("Accept", "text/plain")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("enabled=1\nssid=neolao\nkey=1234\n");
                    done();
                });
        });

        it("should return the wifi settings in JSON format", function(done)
        {
            request(baseUrl)
                .get("/wifi")
                .set("Accept", "application/json")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    var response = JSON.parse(response.text);
                    expect(response).to.deep.equal({
                        enabled: "1",
                        ssid: "neolao",
                        key: "1234"
                    });
                    done();
                });
        });

        it("should return the wifi settings in XML format", function(done)
        {
            request(baseUrl)
                .get("/wifi")
                .set("Accept", "application/xml")
                .expect(200)
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    xml2js.parseString(response.text, function(error, result) {
                        expect(result.response).to.deep.equal({
                            enabled: ["1"],
                            ssid: ["neolao"],
                            key: ["1234"]
                        });
                        done();
                    });
                });
        });
    });

    /**
     * Test the API GET /systems/:id/roms
     */
    describe("GET /systems/:id/roms", function()
    {
        it("should return the ROM list of a system", function(done)
        {
            request(baseUrl)
                .get("/systems/snes/roms")
                .set("Accept", "text/plain")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    response.text.should.equal("0=a.sfc\n1=dédé.sfc\n2=foo bar.sfc\n");
                    done();
                });
        });

        it("should return the ROM list in JSON format", function(done)
        {
            request(baseUrl)
                .get("/systems/snes/roms")
                .set("Accept", "application/json")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    var response = JSON.parse(response.text);
                    response[0].basename.should.equal("a.sfc");
                    response[1].basename.should.equal("dédé.sfc");
                    response[2].basename.should.equal("foo bar.sfc");
                    done();
                });
        });

        it("should return the ROM list in XML format", function(done)
        {
            request(baseUrl)
                .get("/systems/snes/roms")
                .set("Accept", "application/xml")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    xml2js.parseString(response.text, function(error, result) {
                        result.response.item[0].basename[0].should.equal("a.sfc");
                        result.response.item[1].basename[0].should.equal("dédé.sfc");
                        result.response.item[2].basename[0].should.equal("foo bar.sfc");
                        done();
                    });
                });
        });
    });

    /**
     * Test the API GET /systems/:id/roms/metadata/:game
     */
    describe("GET /systems/:id/roms/metadata/:game", function()
    {
        it("should return game information", function(done)
        {
            request(baseUrl)
                .get("/systems/snes/roms/metadata/a.sfc")
                .set("Accept", "text/plain")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    expect(response.text).to.contain("basename=a.sfc");
                    done();
                });
        });

        it("should return game information", function(done)
        {
            request(baseUrl)
                .get("/systems/snes/roms/metadata/dédé.sfc")
                .set("Accept", "application/json")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }
                    var response = JSON.parse(response.text);
                    response.basename.should.equal("dédé.sfc");
                    done();
                });
        });

        it("should return game information", function(done)
        {
            request(baseUrl)
                .get("/systems/snes/roms/metadata/foo bar.sfc")
                .set("Accept", "text/plain")
                .end(function(error, response) {
                    if (error) {
                        done(error);
                        return;
                    }

                    expect(response.text).to.contain("basename=foo bar.sfc");
                    done();
                });
        });
    });

});
