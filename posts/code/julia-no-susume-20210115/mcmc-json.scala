import play.api.libs.json._
import scala.math.pow

case class JSONConfig(
  ntimes: Array[Int]
)

object mcmc_json {
  implicit val validationResultReads = Json.reads[JSONConfig] // required to make the next line work
  def parseResultJSON(json: String) = Json.parse(json).as[JSONConfig]

  def main(args: Array[String]) = {
    val source = scala.io.Source.fromFile(args(0))
    val lines = try source.mkString finally source.close
    val config = parseResultJSON(lines)
    for (n <- config.ntimes) println(pi_mcmc(n))
  }

  def pi_mcmc(n: Int) = {
    var t = 0
    val rnd = scala.util.Random
    for (i <- 1 to n) {
        val (x, y) = (rnd.nextDouble, rnd.nextDouble)
        if (pow(x, 2) + pow(y, 2) <= 1) {
            t += 1
        }
    }
    4*t/n.toDouble
  }
}
