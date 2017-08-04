define([
    "app",
    "C"
], function(
    app,
    C
) {
    /*

       Mocha Unit Test DEMO

        Test framework MOCHA
       @see http://visionmedia.github.io/mocha/

        BDD style assert
       @see http://chaijs.com/

      */
    var expect = chai.expect,
        assert = chai.assert,
        should = chai.should();

    /*

      BDD style assert
      ==================

      Should style

      should.exist
      should.not.exist
      should.equal
      should.not.equal
      should.Throw
      should.not.Throw

      foo.should.be.a('string');
      foo.should.equal('bar');
      foo.should.have.length(3);
      beverages.should.have.property('tea').with.length(3);

      Expect style

      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.length(3);
      expect(beverages).to.have.property('tea').with.length(3);

      var answer = 43;
      // AssertionError: expected 43 to equal 42.
      expect(answer).to.equal(42); 

      // AssertionError: topic [answer]: expected 43 to equal 42.
      expect(answer, 'topic [answer]').to.equal(42);


      TDD style assert
      ==================
      assert.typeOf(foo, 'string'); // without optional message
      assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
      assert.equal(foo, 'bar', 'foo equal `bar`');
      assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
      assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
    */

    describe("登录模块单元测试开始", function() {
        // Synchronous code
        describe('同步测试代码', function() {
            var i, j;
            beforeEach(function() {
                console.log("- specs start -");
                i = 100;
                j = 2
                j * i > 150
            });
            it("i == 100", function() {
                i.should.equal(100);
            })
            it("i == 100", function() {
                expect(i).to.equal(100);
            })
            it("i == 100", function() {
                assert.equal(i, 100, "i equal 100");
            })
            console.log(1);
            it("j*i > 150", function() {
                (i * j > 150).should.equal(true);
            })
        })


        var asyncMethod = function(callback) {
            setTimeout(function() {
                callback(200);
            }, 1000)
        }

            // Synchronous code
        describe('异步测试代码', function() {
            var i;
            beforeEach(function() {
                i = 100;
            });
            it("result*i>1000", function(done) {
                i.should.equal(100);
                asyncMethod(function(result) {
                    result.should.equal(200);
                    result.should.be.a("Number");
                    done()
                    // if (result * i > 1000) {
                    //     done()
                    // } else {
                    //     throw new Error("result * i < 1000")
                    // }
                })
            })
            it("result*i>1000", function(done) {
                i.should.equal(100);
                asyncMethod(function(result) {
                    result.should.equal(200);
                    result.should.be.a("Number");
                    done()
                    // if (result * i > 1000) {
                    //     done()
                    // } else {
                    //     throw new Error("result * i < 1000")
                    // }
                })
            })
        })
    })
})
